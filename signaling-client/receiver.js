const webrtc = {}
webrtc.RTCPeerConnection =  window.RTCPeerConnection || window.mozRTCPeerConnection || 
                            window.webkitRTCPeerConnection || window.msRTCPeerConnection
webrtc.RTCSessionDescription =  window.RTCSessionDescription || window.mozRTCSessionDescription ||
                                window.webkitRTCSessionDescription || window.msRTCSessionDescription
navigator.getUserMedia =    navigator.getUserMedia || navigator.mozGetUserMedia ||
                            navigator.webkitGetUserMedia || navigator.msGetUserMedia

let pc, dc

const host = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(host)
ws.onopen = e => {
    dispLog('ws onopen', e)
}
ws.onclose = e => {
    dispLog('ws onclose', e)
}
ws.onerror = e => {
    console.error('ws onerror', e)
}
ws.onmessage = e => {
    dispLog('ws onmessage', e)

    setOffer(e.data)
}
const sendSdp = async sdp => {
    dispLog('sendSdp', sdp)
    await waitWebSocketReady()
    ws.send(sdp.sdp)
}
const waitWebSocketReady = () => {
    dispLog('waitWebSocket')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve((ws.readyState == 1)? ws.readyState: waitWebSocketReady())
        }, 1000)
    })
}

const setOffer = async sdp => {
    dispLog('setOffer')
    const config = {'iceServers': [
        {'urls': 'stun:stun.l.google.com:19302'},
        {'urls': 'stun:stun1.l.google.com:19302'}
    ]}
    pc = new webrtc.RTCPeerConnection(config)

    pc.ondatachannel = e => {
        dispLog('pc ondatachannel')
        dc = e.channel

        dc.onopen = e => {
            dispLog('dc onopen', e)
        }
        dc.onclose = e => {
            dispLog('dc onclose', e)
        }
        dc.onmessage = e => {
            dispLog('dc onmessage', e, e.data)
        }
    }

    pc.onicecandidate = e => {
        dispLog('pc onicecandidate')
        const candidate = e.candidate
        if (!candidate) {
            sendSdp(pc.localDescription)
        }
    }

    await pc.setRemoteDescription(new webrtc.RTCSessionDescription({
        'type': 'offer',
        'sdp': sdp
    }))
    const desc = await pc.createAnswer()
    await pc.setLocalDescription(desc)
}

const dispLog = (...objs) => {
    objs.forEach(obj => {
        if (typeof obj === 'string') {
            console.log(obj)
            document.body.insertAdjacentHTML('beforeend', `<p>${obj}</p>`);
        } else {
            console.log(obj)
            document.body.insertAdjacentHTML('beforeend', `<p>${obj.toString()} ${JSON.stringify(obj)}</p>`);
        }
    })
}
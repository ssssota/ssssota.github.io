<script>
  import Item from './Item.svelte';
  let selected = { title: 'test', detail: 'hello world' };
</script>

<Item title="History">
  <span slot="content">
    <table>
      <tr><th>1999/10/20</th><td>愛知県に生まれる</td></tr>
      <tr><th>2015/04</th><td><a href="https://www.toyota-ct.ac.jp/" target="_blank">豊田工業高等専門学校</a> 入学</td></tr>
      <tr><th>2018/08,09</th><td><a href="https://www.denkiyagi.jp/" target="_blank">デンキヤギ株式会社</a>にてインターン</td></tr>
      <tr><th>2020/03</th><td>豊田工業高等専門学校 卒業</td></tr>
      <tr><th></th><td>デンキヤギ株式会社にてアルバイト開始</td></tr>
      <tr><th>2020/04</th><td><a href="https://www.kyutech.ac.jp/" target="_blank">九州工業大学</a> 入学（情報工学部）</td></tr>
    </table>
  </span>
</Item>

<style type="text/scss">
table {
  margin: 1em;
  text-align: left;

  th {
    padding: 0 0.5em;
  }
}
</style>
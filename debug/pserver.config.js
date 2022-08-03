module.exports = {
  staticRoot: './static',
  xx:1,
  dontInfo: false,
  proxy: [
    {
      target: 'http://www.baidu.com',
      filter: (req, res) => {
        console.log('请求', req.path, !!req.path.match(/^\/mock/));
        return !!req.path.match(/^\/mock/);
      }
    }
  ]
}
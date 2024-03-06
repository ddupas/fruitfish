const fname = '../fruitfish_secrets.tgz'
const flist = [ config.json ] 
tar -czvf $fname ...$flist
print $"secrets saved to ($fname)"

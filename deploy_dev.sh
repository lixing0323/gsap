#ssh ubuntu@182.254.214.48 -p 22
server='182.254.214.48'
ssh_port='22'
user='ubuntu'
password='Dev@2021'
remote_path='/home/ubuntu/projects/sawh'

if [ -e dist.zip ]
then
    rm -f dist.zip
fi

echo 'Start building...'
yarn build:stage
echo 'Uploading...'
zip -qr dist.zip dist/*

/usr/bin/expect <<-EOF
set timeout 120

log_user 1
spawn scp -P $ssh_port dist.zip $user@$server:$remote_path
expect "*password:" { send "$password\r" }
expect eof

log_user 0
spawn ssh -P $ssh_port $user@$server
expect {
  "*yes/no" { send "yes\r"; exp_continue }
  "*password:" { send "$password\r"  }
}

expect "*~*"
log_user 1
send "cd $remote_path;rm -rf dist_bak 2>/dev/null; mv dist dist_bak 2>/dev/null; unzip -q dist.zip; chown -R $user:$user dist; rm -f dist.zip\r"
expect "*"
send "exit\r"
expect eof
EOF

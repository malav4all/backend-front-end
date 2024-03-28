# #!/bin/sh
# mkdir -p /var/log/nginx/

# touch /var/log/nginx/access.log
# touch /var/log/nginx/error.log
# chown nginx:nginx /var/log/nginx/*
# chmod 777 /var/log/nginx/access.log
# chmod 777 /var/log/nginx/error.log
# nginx &
# sh

#!/bin/sh

mkdir -p /var/log/nginx/
touch /var/log/nginx/access.log
touch /var/log/nginx/error.log
chown nginx:nginx /var/log/nginx/*
chmod 777 /var/log/nginx/access.log
chmod 777 /var/log/nginx/error.log

# Start Nginx in the foreground
nginx -g "daemon off;"

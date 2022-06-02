FROM httpd:2.4
COPY ./myhttpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./build/ /usr/local/apache2/htdocs/
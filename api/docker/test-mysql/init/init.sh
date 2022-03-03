#!/bin/bash

MYSQL_SOCKET="/var/run/mysqld/mysqld.sock"

echo "# creating replication user in Master MYSQL"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -S $MYSQL_SOCKET -e "ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -S $MYSQL_SOCKET -e 'CREATE SCHEMA `thegiftingpoint`;'

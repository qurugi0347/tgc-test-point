docker-compose -f docker-compose.yml up -d --build
docker exec -it jun-mysql /bin/bash
cd docker-entrypoint-initdb.d/
sh init.sh

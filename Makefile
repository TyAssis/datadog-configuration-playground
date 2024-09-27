nginx:
	@if [ "$(NGINX_LOGS)" ]; then \
		LOG_LABEL='-l com.datadoghq.ad.logs=[{"source":"nginx","service":"nginx"}]'; \
	else \
		LOG_LABEL=''; \
	fi; \
	docker run --name webserver -p 80:80 -v $(PWD)/default.conf:/etc/nginx/conf.d/default.conf \
		-l "com.datadoghq.ad.check_names"='["nginx"]' \
		-l "com.datadoghq.ad.init_configs"='[{}]' \
		-l "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:80/nginx_status/"}]' \
		$$LOG_LABEL \
		-d nginx


nginx-down:
	docker stop webserver
	docker remove webserver


datadog:
	 docker run -d --name datadog-agent -e DD_API_KEY=5f4fbf69cb21ed948e59d62e876fa67c \
		 -e DD_LOGS_ENABLED=true \
		 $(if $(ALL_LOGS),-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true,) \
		 -e DD_CONTAINER_EXCLUDE_LOGS="name:datadog-agent" \
		 -e DD_SITE="datadoghq.com" \
		 -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
		 datadog/agent:latest

datadog-down:
	docker stop datadog-agent
	docker remove datadog-agent


apijs:
	@if [ "$(LOG_RULE)" ]; then \
		LOG_ANNOTATION="--label com.datadoghq.ad.logs=$$(cat $(LOG_RULE) | jq -c .)"; \
	else \
		LOG_ANNOTATION=''; \
	fi; \
	docker build -t apijs \
	$$LOG_ANNOTATION \
	$(PWD)/api-js
	docker run -p 3000:3000 --name apijs apijs

apijs-down:
	docker stop apijs
	docker remove apijs

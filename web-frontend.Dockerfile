FROM baserow/web-frontend:1.20.2

USER root

COPY ./plugins/basecharts/ /baserow/plugins/basecharts/
RUN /baserow/plugins/install_plugin.sh --folder /baserow/plugins/basecharts

USER $UID:$GID

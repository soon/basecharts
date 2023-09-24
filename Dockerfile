FROM baserow/baserow:1.20.2

COPY ./plugins/basecharts/ /baserow/plugins/basecharts/
RUN /baserow/plugins/install_plugin.sh --folder /baserow/plugins/basecharts

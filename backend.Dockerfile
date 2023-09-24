FROM baserow/backend:1.20.2

USER root

COPY ./plugins/basecharts/ $BASEROW_PLUGIN_DIR/basecharts/
RUN /baserow/plugins/install_plugin.sh --folder $BASEROW_PLUGIN_DIR/basecharts

USER $UID:$GID

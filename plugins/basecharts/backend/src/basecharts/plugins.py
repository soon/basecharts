from loguru import logger
from baserow.core.registries import Plugin
from django.urls import path, include

from .api import urls as api_urls


class PluginNamePlugin(Plugin):
    type = "basecharts"

    def get_api_urls(self):
        return [
            path(
                "basecharts/",
                include(api_urls, namespace=self.type),
            ),
        ]

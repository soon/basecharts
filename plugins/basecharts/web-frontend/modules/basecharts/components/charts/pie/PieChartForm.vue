<template>
  <VerticalSpacer>
    <FormField label="Name">
      <Dropdown
        :value="config.xAxisFieldId"
        placeholder="Select Name field"
        @input="updateXAxisFieldId"
      >
        <DropdownItem
          v-for="field in fields"
          :key="field.id"
          :name="field.name"
          :value="field.id"
        >
        </DropdownItem>
      </Dropdown>
    </FormField>

    <FormField label="Value">
      <Dropdown
        :value="config.yAxisFieldId"
        placeholder="Select Value field"
        @input="updateYAxisFieldId"
      >
        <DropdownItem
          v-for="field in fields"
          :key="field.id"
          :name="field.name"
          :value="field.id"
        >
        </DropdownItem>
      </Dropdown>
    </FormField>
  </VerticalSpacer>
</template>

<script>
import Dropdown from 'baserow/modules/core/components/Dropdown.vue'
import DropdownItem from 'baserow/modules/core/components/DropdownItem.vue'
import VerticalSpacer from '../../VerticalSpacer.vue'
import baseChartForm from '../../../mixins/baseChartForm'
import FormField from '@basecharts/components/FormField.vue'

export default {
  components: {
    Dropdown,
    DropdownItem,
    VerticalSpacer,
    FormField,
  },
  mixins: [baseChartForm],
  props: ['fields'],
  configSchema: {
    xAxisFieldId: null,
    yAxisFieldId: null,
  },
  watch: {
    fields: {
      immediate: true,
      handler(fields) {
        if ((fields?.length ?? 0) > 0) {
          if (this.config.xAxisFieldId == null) {
            this.updateXAxisFieldId(
              fields.find((x) => x.type === 'text')?.id ?? null
            )
          }
          if (this.config.yAxisFieldId == null) {
            this.updateYAxisFieldId(
              fields.find((x) => x.type === 'number')?.id ?? null
            )
          }
        }
      },
    },
  },
  methods: {
    updateXAxisFieldId(value) {
      this.setConfigField('xAxisFieldId', value)
    },
    updateYAxisFieldId(value) {
      this.setConfigField('yAxisFieldId', value)
    },
  },
}
</script>

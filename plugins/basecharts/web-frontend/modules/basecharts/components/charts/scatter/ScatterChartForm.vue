<template>
  <VerticalSpacer>
    <FormField label="X-Axis">
      <Dropdown
        :value="config.xAxisFieldId"
        placeholder="Select X-Axis field"
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

    <FormField label="Label">
      <Dropdown
        :value="config.labelFieldId"
        placeholder="Select label field"
        @input="updateLabelFieldId"
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
    labelFieldId: null,
  },
  watch: {
    fields: {
      immediate: true,
      handler(fields) {
        if ((fields?.length ?? 0) > 0) {
          let xAxisFieldId = this.config.xAxisFieldId
          if (xAxisFieldId == null) {
            xAxisFieldId = fields.find((x) => x.type === 'number')?.id ?? null
            this.updateXAxisFieldId(xAxisFieldId)
          }
          if (this.config.yAxisFieldId == null) {
            this.updateYAxisFieldId(
              fields.find((x) => x.type === 'number' && x.id !== xAxisFieldId)
                ?.id ?? null
            )
          }
          if (this.config.labelFieldId == null) {
            this.updateLabelFieldId(
              fields.find((x) => x.type === 'text')?.id ?? null
            )
          }
          console.log(fields)
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
    updateLabelFieldId(value) {
      this.setConfigField('labelFieldId', value)
    },
  },
}
</script>

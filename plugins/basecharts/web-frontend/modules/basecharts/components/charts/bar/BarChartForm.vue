<template>
  <VerticalSpacer>
    <FormField label="Orientation">
      <Dropdown
        :value="config.orientation"
        placeholder="Select orientation"
        @input="updateOrientation"
      >
        <DropdownItem
          v-for="x in orientationOptions"
          :key="x.value"
          :name="x.name"
          :value="x.value"
        >
        </DropdownItem>
      </Dropdown>
    </FormField>
    <FormField label="Label">
      <Dropdown
        :value="config.xAxisFieldId"
        placeholder="Select Label"
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
    <FormField label="Bars">
      <FieldsList
        :items="config.yAxisSeries"
        @add-item="addSeries"
        @remove-item="removeSeries"
      >
        <template #default="props">
          <Dropdown
            :value="props.item.fieldId"
            placeholder="Select Bar"
            @input="(value) => updateYAxisFieldId(props.index, value)"
          >
            <DropdownItem
              v-for="field in fields"
              :key="field.id"
              :name="field.name"
              :value="field.id"
            >
            </DropdownItem>
          </Dropdown>
        </template>
      </FieldsList>
    </FormField>
  </VerticalSpacer>
</template>

<script>
import Button from 'baserow/modules/core/components/Button.vue'
import Dropdown from 'baserow/modules/core/components/Dropdown.vue'
import DropdownItem from 'baserow/modules/core/components/DropdownItem.vue'
import VerticalSpacer from '../../VerticalSpacer.vue'
import baseChartForm from '../../../mixins/baseChartForm'
import FormField from '@basecharts/components/FormField.vue'
import FieldsList from '@basecharts/components/form/FieldsList.vue'

export default {
  components: {
    Button,
    Dropdown,
    DropdownItem,
    VerticalSpacer,
    FormField,
    FieldsList,
  },
  mixins: [baseChartForm],
  props: ['fields'],
  configSchema: {
    xAxisFieldId: null,
    yAxisSeries: [],
    orientation: 'vertical',
  },
  data: function () {
    return {
      orientationOptions: [
        { name: 'Vertical', value: 'vertical' },
        { name: 'Horizontal', value: 'horizontal' },
      ],
    }
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
          if (this.config.yAxisSeries.length === 0) {
            this.updateYAxisFieldId(
              0,
              fields.find((x) => x.type === 'number')?.id ?? null
            )
          }
        }
      },
    },
  },
  methods: {
    updateOrientation(value) {
      this.setConfigField('orientation', value)
    },
    updateXAxisFieldId(value) {
      this.setConfigField('xAxisFieldId', value)
    },
    updateYAxisFieldId(index, value) {
      this.updateConfig((config) => {
        while (config.yAxisSeries.length <= index) {
          config.yAxisSeries.push({ fieldId: null })
        }
        config.yAxisSeries[index].fieldId = value
      })
    },
    addSeries() {
      this.updateConfig((config) => {
        config.yAxisSeries.push({
          fieldId: null,
        })
      })
    },
    removeSeries(index) {
      this.updateConfig((config) => {
        config.yAxisSeries.splice(index, 1)
      })
    },
  },
}
</script>

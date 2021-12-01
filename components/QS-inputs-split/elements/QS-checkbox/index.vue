<template>
	
</template>

<script>
	export default {
		components: {
			QStemplate
		},
		props: {
			itemArray: {
				type: Array,
				default () {
					return []
				}
			},
			color: {
				type: String,
				default: '#33cc33'
			},
			scale: {
				type: String,
				default: '.8'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		computed:{
			getStatus() {
				const status = [];
				const value = this.value;
				const itemArray = this.itemArray;
				if(value instanceof Array && value.length > 0) {
					for(let i = 0; i < itemArray.length; i++) {
						const j = value.findIndex(item=>item === itemArray[i].value)
						if(j >= 0) {
							status.push(true);
						}else{
							status.push(false);
						}
					}
				}else{
					itemArray.forEach(()=>{
						status.push(false);
					})
				}
				return status;
			}
		},
		methods: {
			checkboxChange({
				detail: {
					value
				}
			}) {
				this.setValue(value);
			}
		},
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.checkbox
		})]
	};
</script>

<style scoped>
	@import url("../../css/inputs.css");
</style>

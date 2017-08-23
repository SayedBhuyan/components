Vue.component("tabs", {
	template: `
	<div>
		<div class="tabs">
		  <ul>
		    <li v-for="tab in tabs" v-bind:class="{'is-active' : tab.isActive}"><a v-on:click="selectTab(tab)" v-bind:href="tab.href">{{ tab.name }}</a></li>
		  </ul>
		</div>
		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>

	`,
	data: function() {
		return {
			tabs: []
		}
	},
	created: function() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab: function(selectedTab) {
			this.tabs.forEach(function(tab, i) {
				tab.isActive = (tab.name == selectedTab.name);
			});
		}
	}
});

Vue.component("tab", {
	template: "<div v-show='isActive'><slot></slot></div>",
	props: {
		name: {required: true},
		selected: {default: false},
	},
	data: function() {
		return {
			isActive: false
		}
	},
	computed: {
		href: function() {
			return "#" + this.name.toLowerCase().replace(/ /g, '-');
		}
	},
	mounted: function() {
		this.isActive = this.selected;
	}
});

var app = new Vue({
	el: "#root",
});
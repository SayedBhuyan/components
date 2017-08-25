/*
# Tabs <tabs></tabs>
*/
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


/*
# Tab <tab></tab>
*/
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


/*
# Message List <message-list></message-list>
*/
Vue.component("message-list", {
	template: `
		<div>
			<slot></slot>
		</div>
	`
});

/*
# Message <message></message>
*/
Vue.component("message", {
	data: function() {
		return {
			isVisible: true
		}
	},
	template: `
	<article class="message" v-show="isVisible">
		<div class="message-header">
			<h3>{{ title }}</h3>
			<button @click="hideModal" class="delete" area-label="delete"></button>
		</div>
		<div class="message-body">
			<p><slot></slot></p>
		</div>
	</article>
	`,
	props: ['title'],
	methods: {
		hideModal: function() {
			this.isVisible = false;
		}
	}
});


/*
# Modal <modal></modal>
*/
Vue.component("modal", {
	template: `
		<div class="modal is-active">
		  <div class="modal-background"></div>
		  <div class="modal-card">
		    <header class="modal-card-head">
		      <p class="modal-card-title">
				<slot name="header"></slot>
		      </p>
		      <button v-on:click="$emit('close')" class="delete" aria-label="close"></button>
		    </header><!-- end modal-card-head -->
		    <section class="modal-card-body">
		      <slot></slot>
		    </section><!-- end modal-card-body -->
		    <footer class="modal-card-foot">
		      <slot name="footer">
				<button class="button is-success">Okay</button>
		      </slot>
		    </footer>
		  </div>
		</div>
	`
});

var app = new Vue({
	el: "#root",
	data: {
		messages: [
			{title: "Syeed Redom", body: "Hi there"},
			{title: "John Doe", body: "How cool it is. isn't it?"},
			{title: "Jimmy Doe", body: "Now you see me :)"},
			{title: "Busy Guy", body: "I'll be right back."},
		],
		showModal: false
	}
});
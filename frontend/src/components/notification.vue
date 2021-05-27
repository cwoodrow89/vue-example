<template>
  <transition name="slide-y-fade">
    <div
      v-show="!hide"
      class="Notification-Container"
    >
      <p v-show="addingAnItem">
        Great! You added:<br><strong>{{ shortlistedTitle }}</strong><br>
        to your shortlist.
      </p>
      <p v-show="!addingAnItem">
        You have removed:<br><strong>{{ removedTitle }}</strong><br>
        from your shortlist.
      </p>
      <button
        v-show="addingAnItem"
        :class="{highlight: isFollowingShortlisted}"
        @click="onFollow"
      >
        {{ isFollowingShortlisted ? 'Following' : 'Follow' }} {{ shortlistedCompany }}
        <span>
          <i class="fas fa-plus" />
        </span>
      </button>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Notification',

  props: {
    item: {
      type: Object,
      default() { return {}; },
    },
  },

  data() {
    return {
      hide: true,
      notificationTimeout: null,
      addingAnItem: null,
    };
  },

  computed: {
    shortlistedTitle() {
      if (this.latestShortlistedItem) {
        return this.latestShortlistedItem.title;
      } return '';
    },
    shortlistedCompany() {
      if (this.latestShortlistedItem) {
        return this.latestShortlistedItem.company_name;
      } return '';
    },
    removedTitle() {
      if (this.latestRemovedItem) {
        return this.latestRemovedItem.title;
      } return '';
    },
    isFollowingShortlisted() {
      if (this.latestShortlistedItem) {
        return (
          this.following.find((obj) => obj.company_id === this.latestShortlistedItem.company_id)
        );
      } return false;
    },
    ...mapGetters(['latestShortlistedItem', 'shortlistLength']),
    ...mapState(['latestRemovedItem', 'following']),
  },

  watch: {
    shortlistLength(newLength, prevLength) {
      this.addingAnItem = newLength > prevLength;
      this.displayNotification();
    },
  },

  mounted() {
  },

  methods: {
    displayNotification() {
      this.hide = false;
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = setTimeout(() => { this.hide = true; }, 3000);
    },
    onFollow() {
      this.$store.commit('addToFollowing', { company_id: this.latestShortlistedItem.company_id, company_name: this.latestShortlistedItem.company_name });
    },
  },
};
</script>

<style scoped type="text/scss" lang="scss">
.Notification-Container {
    position: fixed;
    bottom: 10px;
    left: 10px;
    height: auto;
    width: 320px;
    max-width: 80vw;
    z-index: 2;
    background: #eee;
    padding: 0px 20px;
    border-radius: 6px;
    border-left: solid #ddd 8px;

    button {
        position: relative;
        width: 100%;
        padding: 12px;
        margin: 0 0 12px 0;
        cursor: pointer;

        &.highlight {background: white;}

        span {
            position: absolute;
            right: 20px;
        }
    }
}

.slide-y-fade-enter-active {
  transition: all .3s ease;
}
.slide-y-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-y-fade-enter, .slide-y-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

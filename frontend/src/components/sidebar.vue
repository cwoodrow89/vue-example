<template>
  <transition name="slide-x-fade">
    <div
      v-show="showSidebar"
      class="Sidebar-Container"
    >
      <div class="Title-Container">
        <span @click="onClickClose"><i class="fas fa-chevron-right" /></span>
        <h3
          :class="{
            selected:
              showShortlist
          }"
          @click="onToggleList"
        >
          Shortlist
        </h3>
        <h3
          :class="{
            selected:
              !showShortlist
          }"
          @click="onToggleList"
        >
          Following
        </h3>
      </div>

      <div
        v-show="showShortlist"
        class="List-Container"
      >
        <p
          v-if="shortlist.length === 0"
          class="empty"
        >
          List is empty  <span><i class="far fa-frown" /></span>
        </p>
        <ul
          v-for="shortlistItem in shortlist"
          :key="shortlistItem.id"
        >
          <li>
            {{ shortlistItem.company_name }}<br><strong>{{ shortlistItem.title }}</strong>
            <span
              class="delete"
              @click="onClickRemove(shortlistItem)"
            ><i class="fas fa-trash-alt" /></span>
          </li>
        </ul>
      </div>

      <div
        v-show="!showShortlist"
        class="List-Container"
      >
        <p
          v-if="following.length === 0"
          class="empty"
        >
          List is empty  <span><i class="far fa-frown" /></span>
        </p>
        <ul
          v-for="followingItem in following"
          :key="followingItem.company_id"
        >
          <li>
            {{ followingItem.company_name }}
            <span
              class="delete"
              @click="onClickUnfollow(followingItem.company_id)"
            ><i class="fas fa-trash-alt" /></span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',

  props: {
    item: {
      type: Object,
      default() { return {}; },
    },
  },

  data() {
    return {
      showShortlist: true,
    };
  },

  computed: {
    ...mapState(['shortlist', 'showSidebar', 'following']),
  },

  mounted() {
  },

  methods: {
    onClickClose() {
      this.$store.commit('toggleSidebar');
    },
    onClickRemove(item) {
      this.$store.commit('removeFromShortlist', item);
      this.$store.commit('setLatestRemovedItem', item);
    },
    onClickUnfollow(id) {
      this.$store.commit('removeFromFollowing', id);
    },
    onToggleList() {
      this.showShortlist = !this.showShortlist;
    },
  },
};
</script>

<style scoped type="text/scss" lang="scss">
.Sidebar-Container {
    width: 30%;
    min-width: 300px;
    background: #ddd;
    z-index: 1;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    overflow-y: scroll;

    .Title-Container {
        height: 70px;
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        box-shadow: 0px 1px 2px rgb(0 0 0 / 8%);

        span {
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            padding: 12px;
        }
        h3 {
            margin: 0 0 6px;
            cursor: pointer;
        }
        .selected {
            text-decoration: underline;
        }
    }

    .List-Container {
        padding: 90px 20px 20px 20px;
        overflow-y: scroll;

        ul {padding: 0;}
        li {
            list-style: none;
        }
        .empty {
            opacity: 0.6;
        }
        .delete {
            position: absolute;
            right: 8px;
            cursor: pointer;
        }
    }
}

.slide-x-fade-enter-active {
  transition: all .3s ease;
}
.slide-x-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-x-fade-enter, .slide-x-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>

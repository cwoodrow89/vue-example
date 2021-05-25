<template>
  <ol class="Job">
    <li class="Job-item Group">
      <a
        class="Job-logo"
        href=""
      >
        <img
          :src="item.logo"
          alt="hi"
        >
      </a>
      <a
        class="Job-link"
        href=""
      >
        <span class="Job-info">
          <span class="Job-company">{{ item.company_name }}</span>
          <span class="Job-desc">{{ item.title }} - {{ item.location }}</span>
        </span>
        <span class="Job-meta">
          <i class="far fa-calendar-alt" /> {{ item.deadline }},
          <i class="fas fa-pound-sign" /> {{ item.salary | noPoundSigns }},
          {{ item.duration }}
        </span>
      </a>
      <a
        href=""
        class="IconLike"
        @click.prevent="onShortlisted"
      >
        <span class="IconHeart IconHeart--like">
          <i
            class="fa-heart"
            :class="isShortlisted ? 'fas' : 'far'"
          />
        </span>
      </a>
    </li>
  </ol>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'JobItem',

  filters: {
    noPoundSigns(value) {
      if (!value) return '';
      const valueStr = value.toString();
      return valueStr.replace(/\u00A3/g, '');
    },
  },

  props: {
    item: {
      type: Object,
      default() { return {}; },
    },
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapState(['shortlist']),
    isShortlisted: {
      get() {
        return this.shortlist.find((job) => job.id === this.item.id);
      },
      set(value) {
        return value;
      },
    },
  },

  mounted() {
  },

  methods: {
    onShortlisted() {
      if (this.isShortlisted) {
        this.$store.commit('removeFromShortlist', this.item);
        this.$store.commit('setLatestRemovedItem', this.item);
      } else {
        this.$store.commit('addToShortlist', this.item);
      }
      this.isShortlisted = !this.isShortlisted;
    },
  },
};
</script>

<style scoped type="text/scss" lang="scss">
.Job {
    margin:0 0 60px 0;
    width: 100%;
    padding: 0;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    /*padding: 0;*/
    text-align: left;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.08);

    @media screen and (max-width: 667px) {
        margin: 0 0 15px 0;
    }
  }

  a {
    text-decoration: none;
  }

  .Job-item {
    padding: 15px;
    border-bottom: 1px solid #dddddd;
    display: block;
    list-style: none;
    position: relative;
    &:last-child {
      border: none;
    }
  }

  span {
    display: block;
  }

  .Job-meta {
    display: block;
    color: #666;
  }

  .Job-desc {
    font-size: 18px;
    font-weight: 700;
  }

  .Job-link {
    padding-left: 15px;
    width: calc(100% - 130px);
    @media screen and (max-width: 667px) {
        width: auto;
    }
  }

  .Job-item,
  .Group {
    display: flex;
    flex-direction: row-reverse;
    @media screen and (max-width: 667px) {
        flex-direction: column;
    }
  }

  .IconHeart {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translate(0, -50%);
    @media screen and (max-width: 667px) {
        top: 16px;
        right: 16px;
        left: initial;
        transform: none;
    }
    i {
      color: red;
      font-size: 25px;
    }
  }
</style>

import RESOURCE_STATUS from '../../constants/resourceStatus';
import FAQs_TYPES from '../../constants/FAQs';
import { SET_FAQs, SET_FAQs_LOADING, SET_ON_EDIT_FAQ } from './faqActions';
import { PUSH_ARTICLES, SET_ARTICLES_LOADING, SET_REVIEW_ARTICLE } from './articleActions';
import { PUSH_REVIEWS, SET_REVIEWS_LOADING, SET_REVIEW_ITEM } from './reviewActions';
import {
  SET_BRACELETS_LOADING,
  SET_KINDLES_LOADING,
  SET_BEADS_LOADING,
  SET_OTHERS_LOADING,
  PUSH_BRACELETS,
  PUSH_KINDLES,
  PUSH_BEADS,
  PUSH_OTHERS,
  SET_REVIEW_BRACELET,
  SET_REVIEW_KINDLE,
  SET_REVIEW_BEAD,
  SET_REVIEW_OTHER,
} from './catalogActions';
import {
  SET_ASTRO_LOADING,
  SET_TARO_LOADING,
  SET_RUNE_LOADING,
  SET_RITUAL_LOADING,
  PUSH_ASTRO,
  PUSH_TARO,
  PUSH_RUNE,
  PUSH_RITUAL,
} from './consultActions';

const SIMPLE_LOADABLE_CONTENT = {
  data: [],
  status: RESOURCE_STATUS.INITIAL
}

const LOADABLE_CONTENT = {
  ...SIMPLE_LOADABLE_CONTENT,
  reviewItem: null,
  error: null,
  page: null
};

const initialState = {
  articles: {...LOADABLE_CONTENT},
  reviews: {...LOADABLE_CONTENT},
  // catalog data
  bracelets: {...LOADABLE_CONTENT},
  beads: {...LOADABLE_CONTENT},
  others: {...LOADABLE_CONTENT},
  kindles: {...LOADABLE_CONTENT},
  // consult data
  astro: {...LOADABLE_CONTENT},
  rune: {...LOADABLE_CONTENT},
  ritual: {...LOADABLE_CONTENT},
  taro: {...LOADABLE_CONTENT},
  // faq
  // faq: {...SIMPLE_LOADABLE_CONTENT}
  faq: {
    astro: [],
    bracelets: [],
    beads: [],
    bars: [],
    onEdit: null,
    status: RESOURCE_STATUS.INITIAL
  }
};

export default (state = initialState, action) => {
  console.log('actioN: ', action)
  switch (action.type) {
    // article action cases
    case SET_ARTICLES_LOADING: return {
      ...state,
      articles: {
        ...state.articles,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_ARTICLES: return {
      ...state,
      articles: {
        ...state.articles,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.articles.data, ...action.payload.articles],
        page: action.payload.page
      }
    };
    case SET_REVIEW_ARTICLE: return {
      ...state,
      articles: {
        ...state.articles,
        reviewItem: action.payload
      }
    }

    // review action cases
    case SET_REVIEWS_LOADING: return {
      ...state,
      reviews: {
        ...state.reviews,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_REVIEWS: return {
      ...state,
      reviews: {
        ...state.reviews,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.reviews.data, ...action.payload.reviews],
        page: action.payload.page
      }
    };
    case SET_REVIEW_ITEM: return {
      ...state,
      reviews: {
        ...state.reviews,
        reviewItem: action.payload
      }
    }

    // bracelets action cases
    case SET_BRACELETS_LOADING: return {
      ...state,
      bracelets: {
        ...state.bracelets,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_BRACELETS: return {
      ...state,
      bracelets: {
        ...state.bracelets,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.bracelets.data, ...action.payload.data],
        page: action.payload.page
      }
    };
    case SET_REVIEW_BRACELET: return {
      ...state,
      bracelets: {
        ...state.bracelets,
        reviewItem: action.payload
      }
    };

    // beads action cases
    case SET_BEADS_LOADING: return {
      ...state,
      beads: {
        ...state.beads,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_BEADS: return {
      ...state,
      beads: {
        ...state.beads,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.beads.data, ...action.payload.data],
        page: action.payload.page
      }
    };
    case SET_REVIEW_BEAD: return {
      ...state,
      beads: {
        ...state.beads,
        reviewItem: action.payload
      }
    };

    // kindles action cases
    case SET_KINDLES_LOADING: return {
      ...state,
      kindles: {
        ...state.kindles,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_KINDLES: return {
      ...state,
      kindles: {
        ...state.kindles,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.kindles.data, ...action.payload.data],
        page: action.payload.page
      }
    };
    case SET_REVIEW_KINDLE: return {
      ...state,
      kindles: {
        ...state.kindles,
        reviewItem: action.payload
      }
    };
      
    // others action cases
    case SET_OTHERS_LOADING: return {
      ...state,
      others: {
        ...state.others,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_OTHERS: return {
      ...state,
      others: {
        ...state.others,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.others.data, ...action.payload.data],
        page: action.payload.page
      }
    };
    case SET_REVIEW_OTHER: return {
      ...state,
      others: {
        ...state.others,
        reviewItem: action.payload
      }
    };

    // consult actions
    // astro actions
    case SET_ASTRO_LOADING: return {
      ...state,
      astro: {
        ...state.astro,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_ASTRO: return {
      ...state,
      astro: {
        ...state.astro,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.astro.data, ...action.payload]
      }
    };
    // taro actions
    case SET_TARO_LOADING: return {
      ...state,
      taro: {
        ...state.taro,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case PUSH_TARO: return {
      ...state,
      taro: {
        ...state.taro,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.taro.data, ...action.payload]
      }
    };
    // rune actions
    case SET_RUNE_LOADING: return {
      ...state,
      rune: {
        ...state.rune,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };;
    case PUSH_RUNE: return {
      ...state,
      rune: {
        ...state.rune,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.rune.data, ...action.payload]
      }
    };
    // ritual actions
    case SET_RITUAL_LOADING: return {
      ...state,
      ritual: {
        ...state.ritual,
        error: null,
        status: RESOURCE_STATUS.LOADING
      }
    };;
    case PUSH_RITUAL: return {
      ...state,
      ritual: {
        ...state.ritual,
        status: RESOURCE_STATUS.LOADED,
        data: [...state.ritual.data, ...action.payload]
      }
    };

    //FAQs actions
    case SET_FAQs_LOADING: return {
      ...state,
      faq: {
        ...state.faq,
        status: RESOURCE_STATUS.LOADING
      }
    };
    case SET_FAQs: return {
      ...state,
      faq: {
        status: RESOURCE_STATUS.LOADED,
        astro: action.payload.filter(x => x.category === FAQs_TYPES.ASTRO),
        bracelets: action.payload.filter(x => x.category === FAQs_TYPES.BRACELETS),
        beads: action.payload.filter(x => x.category === FAQs_TYPES.BEADS),
        bars: action.payload.filter(x => x.category === FAQs_TYPES.BARS),
      }
    }
    case SET_ON_EDIT_FAQ: return {
      ...state,
      faq: { 
        ...state.faq,
        onEdit: action.payload
      }
    };

    default: return state;
  }
};
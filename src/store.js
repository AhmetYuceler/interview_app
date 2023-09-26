// store.js

import { createStore, combineReducers } from 'redux';

// İlk olarak karakter ve seri sayılarını yönetecek reducer'ları oluşturun
const characterCountReducer = (state = 0, action) => {
  // Eğer ilgili action türünü kullanıyorsanız, state'i güncelleyin
  if (action.type === 'SET_CHARACTER_COUNT') {
    return action.payload;
  }
  return state;
};

const seriesCountReducer = (state = 0, action) => {
  if (action.type === 'SET_SERIES_COUNT') {
    return action.payload;
  }
  return state;
};

// Reducer'ları birleştirin
const rootReducer = combineReducers({
  characterCount: characterCountReducer,
  seriesCount: seriesCountReducer,
});

// Store'u oluşturun
const store = createStore(rootReducer);

export default store;

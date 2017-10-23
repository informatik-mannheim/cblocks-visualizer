const URLs = {
  FETCH_NODE_IDS_URL: 'http://localhost:9999/boxes/ids',
  FETCH_NODE_URL: 'http://localhost:9999/boxes/'
};

const ItemTypes = {
  NODE: 'node'
};

const Actions = {
  ADD_NODE: 'ADD_NODE',
  ADD_SENSOR: 'ADD_SENSOR',
  FETCH_NODE_IDS_HAS_ERRORED: 'FETCH_NODE_IDS_HAS_ERRORED',
  FETCH_NODE_IDS_IS_LOADING: 'FETCH_NODE_IDS_IS_LOADING',
  FETCH_NODE_IDS_SUCCESS: 'FETCH_NODE_IDS_SUCCESS',
  FETCH_NODE_HAS_ERRORED: 'FETCH_NODE_HAS_ERRORED',
  FETCH_NODE_IS_LOADING: 'FETCH_NODE_IS_LOADING',
  FETCH_NODE_SUCCESS: 'FETCH_NODE_SUCCESS'
};

const reactToolboxVariables = {
		'color-primary': '#405c8a',
    'color-accent': '#4CAF50',
		'color-primary-dark': '#405c8a',
		'preferred-font': "'Roboto', sans-serif",
		'drawer-background-color': 'var(--palette-grey-300)',
		'autocomplete-color-primary-contrast': 'var(--palette-grey-100)',
		'autocomplete-color-primary': 'var(--palette-grey-900)',
		'input-hint-opacity': '100'
};


export {
  URLs,
  ItemTypes,
  Actions,
  reactToolboxVariables
};

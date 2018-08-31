const modeItems = [
	{
		id: 1,
		title: 'All',
		checked: false,
	},
	{
		id: 2,
		title: 'Sale',
		checked: false,
	},

	{
		id: 4,
		title: 'Donate',
		checked: false,
	},

];

const ratingItems = [
	{
		id: 1,
		ratingvalue: 1,
		checked: false,
	},
	{
		id: 2,
		ratingvalue: 2,
		checked: false,
	},
	{
		id: 3,
		ratingvalue: 3,
		checked: false,
	},
	{
		id: 4,
		ratingvalue: 4,
		checked: false,
	},
	{
		id: 5,
		ratingvalue: 5,
		checked: false,
	},
];

const idVerifications = [
  {
    id: 1
  , description: "Author has logged in with a social media account"
  , ratingvalue: 1
  , checked: false
  },
  {
    id: 2
  , description: "Author has verified an email address with us"
  , ratingvalue: 2
  , checked: false
  },
  {
    id: 3
  , description: "Author has verified a phone number with us"
  , ratingvalue: 3
  , checked: false
  },
  {
    id: 4
  , description: "Author has submitted a photo ID"
  , ratingvalue: 4
  , checked: false
  },
  {
    id: 5
  , description: "Author has submitted a photo ID and demonstrated good conduct for 3 months or more"
  , ratingvalue: 5
  , checked: false
  },
];

const filterItem = [
  {
    id: 1,
    name: 'ModeSvg',
  },
  {
    id: 2,
    name: 'DateTimeSvg',
  },
  {
    id: 3,
    name: 'StarSvg',
  },
  {
    id: 4,
    name: 'IdentitySvg',
  },
  {
    id: 5,
    type: 'ion',
    name: 'logo-usd',
  },
  {
    id: 6,
    name: 'CategoriesSvg',
  },
  {
    id: 7,
    name: 'TemplateSvg',
  },
  {
    id: 8,
    name: 'TagsSvg',
  },
  {
    id: 9,
    name: 'OfferSvg',
  },
];

const filterDays = [
	{
		value: 1,
	},
	{
		value: 2,
	},
	{
		value: 3,
	},
	{
		value: 4,
	},
	{
		value: 5,
	},
	{
		value: 6,
	},
	{
		value: 7,
	},
	{
		value: 8,
	},
	{
		value: 9,
	},
	{
		value: 10,
	},
	{
		value: 11,
	},
	{
		value: 12,
	},
];

export default { modeItems,ratingItems,idVerifications,filterItem,filterDays};

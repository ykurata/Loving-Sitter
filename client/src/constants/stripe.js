const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_jB07RDdD2SJjuc0khprUiBce00z88npnC5'
  : 'pk_test_jB07RDdD2SJjuc0khprUiBce00z88npnC5';

export default STRIPE_PUBLISHABLE;
import React from 'react';

import { GET_CURRENT_USER } from './queries';

import { Query } from 'react-apollo';

const withSessions = (Component) => (props) => (
  <Query query={GET_CURRENT_USER}>
    {({data, loading, refetch }) => {
      // console.log('currentuser data', data);
      if (loading) {
        return null;
      }
      return (
        <Component {...props} refetch={refetch} session={data} />
      )
    }}
  </Query>
)

export default withSessions;
import React, { useCallback, useState, useEffect } from 'react';
import { Layout } from '../../shared/components/Layout';
import { SearchVenues } from '../../shared/components/SearchVenues';
import Loading from '../../shared/ui-kits/Loading/Loading';
import styled from 'styled-components';
import { Alert } from '../../shared/ui-kits/Alert';
import { Table } from '../../shared/ui-kits/Table';

const StyledHome = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(10rem, 1fr));
  align-items: center;
  grid-row-gap: 2rem;

  @media only screen and (min-width: 680px) {
    grid-template-rows: repeat(auto-fit, minmax(10rem, 1fr));
  }
`;

export default function Home(props) {
  const { data, searchVenues, loading, error, emptyData, hasData } = props;
  const [params, setParams] = useState({
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    query: 'lunch',
    near: null,
    v: 20170801,
    limit: 3
  });

  const onSearch = useCallback(
    ({ query }, resetValues) => {
      setParams(p => ({ ...p, near: query }));
      resetValues();
    },
    [setParams]
  );

  useEffect(() => {
    if (params.near) {
      searchVenues && searchVenues({ ...params });
    }
  }, [params, searchVenues]);

  const renderContent = () => {
    if (loading) return <Loading center />;
    if (hasData) return <Table data={data} />;
    if (error) return <Alert color="danger">{error.message}</Alert>;
    if (emptyData) return <Alert color="warning">Not found !</Alert>;
  };

  return (
    <Layout>
      <StyledHome>
        <SearchVenues onSubmit={onSearch} />
        {renderContent()}
      </StyledHome>
    </Layout>
  );
}

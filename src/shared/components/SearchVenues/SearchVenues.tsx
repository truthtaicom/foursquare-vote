import React from 'react';
import { Form, FormItem } from '../Form';
import Input from '../../ui-kits/Input/Input';
import { Button } from '../../ui-kits/Button';
import styled from 'styled-components';

const StyledForm = styled(Form)``;

export interface ISearchVenues {
  onSubmit: (e: any, g: any) => void;
}

function SearchVenues(props: ISearchVenues) {
  return (
    <StyledForm onSubmit={props.onSubmit} inline>
      <FormItem>
        <Input type="query" name="query" placeholder="Place" />
      </FormItem>
      <Button color="primary" type="submit" isFull>
        Search
      </Button>
    </StyledForm>
  );
}

export default SearchVenues;

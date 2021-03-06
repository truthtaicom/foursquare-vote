import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Colors from '../Variables/Colors';
import { Text } from '../Text';
import Input from '../Input/Input';
import { Button } from '../Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon';

const StyledTable = styled.table`
  border: 1px solid #dee2e6;
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  text-align: center;
`;

const StyledHeadCell = styled.th<any>`
  border: 1px solid #ddd;
  vertical-align: middle;
  width: 30rem;
  background: ${({ voted }) => (voted ? Colors.success : Colors.white)};
  color: ${({ voted }) => (voted ? Colors.white : Colors.black)};
  padding: 1rem 0;
`;

const StyledCell = styled.td<any>`
  background: ${({ isSelected }) =>
    isSelected ? Colors.warning : Colors.white};
  border: 1px solid ${Colors.grey};
  color: ${Colors.white};

  &:first-child {
    padding: 1rem;
  }
`;

const StyledParticipantCell = styled(StyledHeadCell)`
  width: 30rem;
`;

function Table(props: any) {
  const [participants, setParticipants] = useState<any>([]);
  const [voted, setVoted] = useState<any>(null);

  const onAddParticipant = () => {
    setParticipants([...participants, { name: '', selectedIdx: null }]);
  };

  const onSelectVenue = (participantIdx: any, venueIdx: any) => {
    const result = participants.map((elm: any, idx: number) => {
      if (idx !== participantIdx) return elm;
      return {
        ...elm,
        selectedIdx: venueIdx
      };
    });

    setParticipants(result);
  };

  useEffect(() => {
    const list = participants
      .map((p: any) => p.selectedIdx)
      .reduce((prev: any, cur: any) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

    const votes = Object.keys(list).sort((a: any, b: any) => list[b] - list[a]);

    if (list[votes[0]] > list[votes[1]]) {
      setVoted(parseInt(votes[0], 10));
    } else {
      setVoted(null);
    }
  }, [participants]);

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledParticipantCell>
              <Text isBlock isBold>
                Participants
              </Text>
            </StyledParticipantCell>
            {props.data.map((elm: any, idx: number) => (
              <StyledHeadCell voted={voted === idx} key={elm.id}>
                <Text isBlock isBold>
                  {elm.name}
                </Text>
                <Text isBlock>
                  {elm.categories[0] && elm.categories[0].name}
                </Text>
              </StyledHeadCell>
            ))}
          </tr>
        </thead>

        <tbody>
          {participants.length > 0 &&
            participants.map((participant: any, participantIdx: number) => (
              <tr key={participantIdx}>
                <StyledCell>
                  <Input defaultValue={participant.name} />
                </StyledCell>
                {props.data.map((elm: any, venueIdx: number) => {
                  const isSelected = participant.selectedIdx === venueIdx;
                  return (
                    <StyledCell
                      key={elm.id}
                      isSelected={isSelected}
                      onClick={() => onSelectVenue(participantIdx, venueIdx)}
                    >
                      {isSelected && <Icon icon={faCheckCircle} size="3x" />}
                    </StyledCell>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </StyledTable>
      <Button color="primary" onClick={onAddParticipant}>
        Add Participant
      </Button>
    </>
  );
}

export default Table;

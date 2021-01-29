import React from 'react';

interface CardProps {
  date: string;
  unitPrice: string;
}

const Cards: React.FC<CardProps> = ({ date, unitPrice }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '2px solid green',
      borderRadius: '7px',
      marginBottom: '5px',
      padding: '0 7px',
      background: '#8FBC8F',
      opacity: 0.5,
      fontWeight: 'bold',
    }}>
      <p>{date}</p>
      <p>{unitPrice}</p>
    </div>
  );
}

export default Cards;
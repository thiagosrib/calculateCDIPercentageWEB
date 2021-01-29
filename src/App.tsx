import React, { useCallback, useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Input from './components/Input';

import api from './services/api';

interface TCDIAcumulada {
  date: string;
  unitPrice: number;
}

function App() {
  const [ investmentDate, setInvestmentDate ] = useState('');
  const [ currentDate, setCurrentDate ] = useState('');
  const [ cdbRate, setCdbRate ] = useState('');

  const [ cdiCalculated, setCdiCalculated ] = useState<TCDIAcumulada[]>([] as TCDIAcumulada[]);

  const getBackendDatas = useCallback(async () => {
    try {
      const reqBody = {
        investmentDate: new Date(investmentDate),
        currentDate: new Date(currentDate),
        cdbRate: parseFloat(cdbRate),
      }

      const response = await api.post('/calculate', reqBody);

      setCdiCalculated(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [investmentDate, currentDate, cdbRate]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    getBackendDatas();
  }, [getBackendDatas]);

  return (
    <div className="App">
      <form>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
          width:  '100%',
        }}>
          <Input
            type='date'
            label='Data inicial do investimento'
            name='investmentDate'
            max='2019-12-03'
            min='2010-01-04'
            onChange={(event) => setInvestmentDate(event.target.value)}
          />
          <Input 
            type='date'
            label='Data final do investimento'
            name='currentDate'
            max='2019-12-03'
            min='2010-01-04'
            onChange={(event) => setCurrentDate(event.target.value)}
          />
          <Input
            type="number"
            label='Percentual CDB'
            name='cdbRate'
            max="22500000"
            min="0.1"
            step="0.1"
            onChange={(event) => setCdbRate(event.target.value)}
          />
          <span className="validity"></span>

          <input type='submit' onClick={handleSubmit} />
        </div>

        {cdiCalculated.length > 0 && (
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <p style={{ fontWeight: 'bold' }}>O resultado final obtido foi</p>
              <Cards date={Intl.DateTimeFormat('pt-BR', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit' }).format(new Date(cdiCalculated[cdiCalculated.length - 1].date))}
                     unitPrice={Intl.NumberFormat('pt-BR', { 
                      style: 'currency',
                      currency: 'BRL' }).format(cdiCalculated[cdiCalculated.length - 1].unitPrice)}
              />
            </div>
            <br /><br />
            <hr />
            <br /><br />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '50px',
            }}>
              {cdiCalculated.map((cdiData: any) => (
                <Cards
                  key={cdiData.date}
                  date={Intl.DateTimeFormat('pt-BR',{
                    year: 'numeric',
                    month: 'numeric',
                    day: '2-digit' }).format(new Date(cdiData.date))}
                  unitPrice={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cdiData.unitPrice)}
                />
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;

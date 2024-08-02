import type { JSX } from 'react';

import logoUrl from 'src/logo.png';
import { AnimalList } from '~AnimalList';
import { formatDate } from '~helpers';

export const App = (): JSX.Element => (
  <div className="text text-center">
    <div>Hello Vite</div>
    <div data-testid="date-label">{formatDate(new Date())}</div>
    <div>
      <img src={logoUrl} alt="logo" />
    </div>
    <AnimalList />
  </div>
);

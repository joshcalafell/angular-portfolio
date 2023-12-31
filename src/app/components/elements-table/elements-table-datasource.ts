import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface ElementsTableItem {
  name: string;
  id: number;
  formula: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ElementsTableItem[] = [
  { id: 1, name: 'Hydrogen', formula: 'H' },
  { id: 2, name: 'Helium', formula: 'He' },
  { id: 3, name: 'Lithium', formula: 'Li' },
  { id: 4, name: 'Beryllium', formula: 'Be' },
  { id: 5, name: 'Boron', formula: 'B' },
  { id: 6, name: 'Carbon', formula: 'C' },
  { id: 7, name: 'Nitrogen', formula: 'N2' },
  { id: 8, name: 'Oxygen', formula: 'O2' },
  { id: 9, name: 'Fluorine', formula: 'FL' },
  { id: 10, name: 'Neon', formula: 'NE' },
  { id: 11, name: 'Sodium', formula: 'NO' },
  { id: 12, name: 'Magnesium', formula: 'MG' },
  { id: 13, name: 'Aluminum', formula: 'AL' },
  { id: 14, name: 'Silicon', formula: 'SI' },
  { id: 15, name: 'Phosphorus', formula: 'P' },
  { id: 16, name: 'Sulfur', formula: 'S' },
  { id: 17, name: 'Chlorine', formula: 'CL' },
  { id: 18, name: 'Argon', formula: 'AR' },
  { id: 19, name: 'Potassium', formula: 'K' },
  { id: 20, name: 'Calcium', formula: 'CA' },
];

/**
 * Data source for the ElementsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ElementsTableDataSource extends DataSource<ElementsTableItem> {
  data: ElementsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ElementsTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    console.log('Disconnecting...');
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ElementsTableItem[]): ElementsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ElementsTableItem[]): ElementsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'formula':
          return compare(a.formula, b.formula, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDelegationVotesComponent } from './modal-delegation-votes/modal-delegation-votes.component';
import { VotesAdminService } from './services/votes-admin.service';
import Swal from 'sweetalert2';
import { Enterprise } from './models/models';

@Component({
  selector: 'app-votes-admin',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule,
    MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, AsyncPipe, MatInputModule,
    MatSelectModule, NgxPaginationModule, MatSlideToggleModule, MatDialogModule],
  templateUrl: './votes-admin.component.html',
  styleUrl: './votes-admin.component.css'
})
export class VotesAdminComponent implements OnInit, OnDestroy {
  showFiller = true;
  mobileQuery: MediaQueryList;
  formAdmin: FormGroup;
  filteredCompany: Observable<Enterprise[]>;
  filteredNif: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];
  p = 1;
  pageEnterprise = 1;
  totalPageEnterprise = 100;
  listEnterprise: Enterprise[] = [];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private fb: FormBuilder,
    public dialog: MatDialog, private votesAdminService: VotesAdminService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.formAdmin = this.fb.group({
      company: '',
      nif: '',
      section: '',
      type: ''
    });
  }

  ngOnInit() {
    this.filteredCompany = this.company!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCompany(value))
    );

    this.filteredNif = this.nif!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNif(value || '')),
    );
  }

  getEnterprise() {
    this.votesAdminService.getEnterprise(this.section?.value, this.type?.value, this.pageEnterprise, this.totalPageEnterprise).subscribe({
      next: (res: Enterprise[]) => {
        this.listEnterprise = res;
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalDelegationVotesComponent, {
      data: {
        animal: 'panda'
      },
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayFnCompany(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filterCompany(value: string): Enterprise[] {
    const filterValue = value.toLowerCase();
    return this.listEnterprise.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFnNif(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filterNif(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  get company(): AbstractControl | null { return this.formAdmin.get('company') }
  get nif(): AbstractControl | null { return this.formAdmin.get('nif') }
  get section(): AbstractControl | null { return this.formAdmin.get('section') }
  get type(): AbstractControl | null { return this.formAdmin.get('type') }
}

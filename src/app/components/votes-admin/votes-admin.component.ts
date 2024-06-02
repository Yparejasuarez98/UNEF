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
import { Enterprise, Section } from './models/models';

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
  currentPage = 1;
  itemsPerPage = 10;
  totalPageEnterprise = 0;

  // listEnterprise: Enterprise[] = [];
  listEnterprise: Enterprise[] = [
    {
      "_id": "66577a74270a7a89a1375c48",
      "address": "ViadelasDosCastillas33EdificioATICA28224PozuelodeAlarcon(Madrid)",
      "city": "Madrid",
      "code": "Jh9Ntc",
      "contry": "España",
      "cuota": 1,
      "email": "alvaro.desimon@1komma5grad.com",
      "name": "1KOMMA5DEGREESS.L.",
      "nif": "B13765490",
      "section": "Instaladores e Ingenierías",
      "status": true,
      "total_votes": 10,
      "type_vote": "delegate",
      "vote_delegate": 10
    }
  ];
  listSection: Section[] = [];

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
    // this.getSection();

  }

  updateEnterpriseAsist(enterprise: Enterprise) {
    const assist = {
      nif: enterprise.nif,
      status: !enterprise.status
    }
    this.votesAdminService.updateEnterpriseAsist(assist).subscribe({
      next: () => {

      }, error: (err) => {
        Swal.fire('Erro!', err.message, 'error');
      }
    });
  }

  getSection() {
    this.votesAdminService.getSections().subscribe({
      next: (res: Section[]) => {
        this.listSection = res;
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    })
  }

  getEnterprise(currentPage: number) {
    this.votesAdminService.getEnterprise(this.section?.value, this.type?.value, currentPage, this.itemsPerPage).subscribe({
      next: (res: Enterprise[]) => {
        this.listEnterprise = res;
        this.totalPageEnterprise = res.length;
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    });
  }

  onPageChange(event: number): void {
    this.currentPage = event;
    this.getEnterprise(this.currentPage);
  }

  openDialog(enterprise: Enterprise) {
    const dialogRef = this.dialog.open(ModalDelegationVotesComponent, {
      data: {
        enterprise: enterprise
      },
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      this.updateDelegate(result)
      console.log(`Dialog result: ${result}`);
    });
  }

  updateDelegate(enterprise: any) {
    const assist = {
      nif: enterprise.nif,
      nif_delegate: enterprise.nif_delegate
    }
    this.votesAdminService.updateEnterpriseDelegate(assist).subscribe({
      next: () => {

      }, error: (err) => {
        Swal.fire('Erro!', err.message, 'error');
      }
    });
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  get company(): AbstractControl | null { return this.formAdmin.get('company') }
  get nif(): AbstractControl | null { return this.formAdmin.get('nif') }
  get section(): AbstractControl | null { return this.formAdmin.get('section') }
  get type(): AbstractControl | null { return this.formAdmin.get('type') }
}

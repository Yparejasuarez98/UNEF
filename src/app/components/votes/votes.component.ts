import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Event, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VotesService } from './services/votes.service';
import { Votes, Vowel } from './models/votes';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Result } from '../../shared/models/response';

@Component({
  selector: 'app-votes',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './votes.component.html',
  styleUrl: './votes.component.css'
})
export class VotesComponent implements OnInit {

  name = '';
  totalVotesAvailable = 0;
  round: number = 1;
  nameSection = '';
  filteredOptions: Observable<any[]>;
  dataUser: Votes;
  partner = new FormControl<string | any>('');
  vowels: Vowel[];
  votesQuantity = new FormControl<number | any>(null);

  constructor(private router: Router, private votes: VotesService) { }

  ngOnInit(): void {
    this.filteredOptionsFunction();
    this.getVowels('');

    this.votes.getSelectedRound().subscribe(round => {
      if (round >= 0) {
        this.round = round;
        this.getUserInfo();
      }
    });
  }

  filteredOptionsFunction() {
    this.filteredOptions = this.partner.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.vowels.slice();
      }),
    );
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.vowels.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getUserInfo() {
    if (this.round <= 0) {
      this.round = 1;
    }
    this.votes.getUserInfo(this.round).subscribe(res => {
      this.dataUser = {
        votes_total_default: res.votes_total_default,
        vote_remaining: res.vote_remaining,
        vote_register_total: res.vote_register_total,
        vote_delegate: res.vote_delegate,
        name: res.name,
        section: res.section
      }
      this.votes.getnameSection(this.dataUser.section);
    });
  }

  getVowels(event: any) {
    const name = event && event.target ? event.target.value : '';
    if (this.round <= 0) {
      this.round = 1;
    }
    this.votes.getVowelList(this.round, name).subscribe({
      next: (res: Vowel[]) => {
        this.filteredOptionsFunction();
        this.vowels = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  asignVote() {
    if (this.round <= 0) {
      this.round = 1;
    }
    const VOTE = {
      round: this.round,
      nif_vowel: this.partner.value.nif,
      votes_quantity: this.votesQuantity.value
    }
    this.votes.asignVote(VOTE).subscribe({
      next: (res: Result) => {
        Swal.fire("Guardado!", res.message, "success");
        this.partner.setValue('');
        this.votesQuantity.setValue(null);
        this.getUserInfo();
      },
      error: (error) => {
        Swal.fire("Error!", error.error.message, "warning");
      },
    });
  }

  save() {
    Swal.fire({
      title: `¿Quieres confirmar el registro de ${this.votesQuantity.value} a ${this.partner.value.name} ?`,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignVote();
      } else if (result.isDenied) {
        Swal.fire("Votos cancelados", "", "info");
      }
    });
  }

  viewDetail() {
    this.router.navigateByUrl('/votos/detalle');
  }
}

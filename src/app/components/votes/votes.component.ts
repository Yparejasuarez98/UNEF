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
import { FormControl } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Result } from '../../shared/models/response';

@Component({
  selector: 'app-votes',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './votes.component.html',
  styleUrl: './votes.component.css'
})
export class VotesComponent implements OnInit {

  name = 'Yeison';
  totalVotesAvailable = 0;
  round = 1;
  nameSection = 'Daniela';
  filteredOptions: Observable<any[]>;
  dataUser: Votes;
  partner = new FormControl<string | any>('');
  vowels: Vowel[];

  constructor(private router: Router, private votes: VotesService) {
    this.dataUser = {
      votes_total_default: 200,
      vote_remaining: 100,
      vote_register_total: 100,
      vote_delegate: 0,
      name: "ACELERA ALTERNATIVAS ENERGATICAS SA DE CV",
      section: "MIXTA"
    }
  }

  ngOnInit(): void {
    this.filteredOptionsFunction();
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
    this.votes.getUserInfo(this.round).subscribe(res => {
      this.dataUser = res;
    });
  }

  getVowels(event: any) {
    this.votes.getVowelList(this.round, event.target.value).subscribe({
      next: (res: Vowel[]) => {
        debugger
        this.vowels = res;
      }
    });
  }

  asignVote() {
    const VOTE = {
      round: this.round,
      nif: this.partner.value,
      votes_quantity: 10
    }
    this.votes.asignVote(VOTE).subscribe({
      next: (res: Result) => {
        Swal.fire("Guardado!", res.message, "success");
      }
    });
  }

  save() {
    Swal.fire({
      title: `Quieres confirmar el registro de a ${this.nameSection} `,
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

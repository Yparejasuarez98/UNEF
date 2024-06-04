import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VoteDetailService } from './services/vote-detail.service';
import { VoteDetail } from './models/vote-detail';
import { NgxPaginationModule } from 'ngx-pagination';
import { VotesService } from '../votes/services/votes.service';
import { Votes } from '../votes/models/votes';


@Component({
  selector: 'app-vote-detail',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatTableModule, MatIconModule, NgxPaginationModule],
  templateUrl: './vote-detail.component.html',
  styleUrl: './vote-detail.component.css'
})
export class VoteDetailComponent {

  displayedColumns: string[] = ['socio', 'votes'];
  dataSource = new MatTableDataSource<VoteDetail>();
  round: number = 0;
  p = 1;
  currentPage = 1;
  totales : number = 0
  listVoteDetail: VoteDetail[] = [];
  dataUser: Votes;

  constructor(private _location: Location, private voteDetailService: VoteDetailService, private votes: VotesService) { }

  ngOnInit(): void {
    this.getList();
    this.getUserInfo();

    this.votes.getSelectedRound().subscribe(round => {
      if(round >= 0){
        this.round = round;
        this.getUserInfo();
        this.getList();
      }
    });
  }

  getList() {
    this.voteDetailService.getList(this.round).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
      }
    });
  }

  getUserInfo() {
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
      if(this.dataSource.data.length < 0){
        this.totales = 0
      } else {
        this.totales = this.dataUser.vote_register_total;
      }
    });
  }

  goBack() {
    this._location.back();
  }

}

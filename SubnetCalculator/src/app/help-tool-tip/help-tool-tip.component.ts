import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help-tool-tip',
  templateUrl: './help-tool-tip.component.html',
  styleUrls: ['./help-tool-tip.component.scss']
})
export class HelpToolTipComponent implements OnInit {
  @Input() helpMessage!: string;

  constructor() { }

  ngOnInit(): void {

  }
}

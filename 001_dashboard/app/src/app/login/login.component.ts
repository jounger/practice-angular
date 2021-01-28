import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/dashboard'], { relativeTo: this.route });
  }

}

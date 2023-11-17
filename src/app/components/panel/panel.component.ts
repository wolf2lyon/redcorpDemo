import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  data!:any[]
  constructor(
    private authService:AuthService,
    private router:Router
  )
  {
    
  }

  ngOnInit(): void {   
    this.authService.showUser().subscribe((result:any) => {
      this.data = result;
      console.log(this.data)
    });
  }
}

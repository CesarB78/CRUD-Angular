import { Component,inject} from '@angular/core';
import{AngularFirestoreModule } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-Angular';

  firestore: AngularFirestoreModule = inject(AngularFirestoreModule);

}

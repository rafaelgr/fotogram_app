import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: "jm@example.com",
    password: "123456"
  };

  registerUser: Usuario = {
    email: "test",
    password: "123456",
    nombre: "Test",
    avatar: "av-1.png"
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm) {
    if (fLogin.invalid) return;
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      // navegar a tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true});
    } else {
      // mostrar alerta de usuario y contraseña incorrectos
      this.uiService.alertaInformativa('Usuario o contraseña incorrectos');
    }
  }

  async registro( fRegistro: NgForm ) {
    if (fRegistro.invalid) return;
    const valido = await this.usuarioService.registro(this.registerUser);
    if (valido) {
      // navegar a tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true});
    } else {
      // mostrar alerta de usuario y contraseña incorrectos
      this.uiService.alertaInformativa('Ocurrió un error durante el registro. Posiblemente el correo electrónico ya exista');
    }
  }

 
  ingresar() {
    this.cambiarASlide(0);
  }

  registrarme() {
    this.cambiarASlide(1);
  }

  cambiarASlide (index: number = 0) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index);
    this.slides.lockSwipes(true);
  }

}

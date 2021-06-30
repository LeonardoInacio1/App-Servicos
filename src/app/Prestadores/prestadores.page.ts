import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController,  } from '@ionic/angular';
import { Prestador } from './prestador.model';
import { PrestadorService} from './prestador.service';


@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.page.html',
  styleUrls: ['./prestadores.page.scss'],
})
export class PrestadoresPage implements OnInit {
  prestadores: Prestador[];

  imagensSERVICO = {
    'M':  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///9MUVk5P0lSV19JTlbv8PE+RE1BR1BESVJFS1P8/PxlaXBHTFVKT1g8QkuKjZKytLbMzc/l5uelp6vAwcOcnqJZXmX29/fHyMra2920trmSlZlfY2rg4eKsrrGHio9ucnh2en9qbnR/gofT1NYnLzsxOEPCAXJMAAAMQUlEQVR4nO1d2YKqMBIVCElYREERFVwQZ/7/EwdMZWHRbtq2CXNznu7VtOaYpPYUi4WBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgcG/Bjde5+UtKIJbma9jd+rp/DL8OLdsTGiI0BKhkBJsW3nsTz2tX8MhR5gurTaWNFrmh6mn9iu4X4lnDcPD13jq6b2N0xWjJ/waIHw9TT3Ft+Dn9it+D452PuPzeCiIysUjOLJtO8LEU3mTYrbH8UglkRDbQX6MT67rnuJjHtg4lNTpceqp/gy5LSiQsNpnrTezbRUS8QPY6URzfAsrLLahsxlS8O7GEZsYr/58fm9DEERkkF8DdyOWcX4Uc04QB8mLYUkgxuV/NrdfwRHO4JJs5Iun9SVwnKLa3BX9sCFg7dizEjcHwqXknr/kH28RaezSZUgjJ5Ubd88lLpmR0siKEI7gnb8UF6ptUwvXsxh9gHfCIhv8NB2RE9iigmAedW0bfBPLeIeNSmZzFA9wCInYoiW2eggtIYL2sKntudioN7ZeWAiZivQJ1lvVEau4Yb8Auk0z4bGIYbolf2EjVWNtl0ZCB3pX8Tcl/CjzcKauwGDnACjXHLvzoTZLtyUBmzRc8iE7+AmuU0/+OziIM4cY+P8sofDuAW0PEWIIz0Fj5MMePbIUMZKVdHCQ5c1AnGbdgAygLSf93RPPeKm/TtwPKIYaqvXW4GQPDrPwfvhjNUL+ZP9116YMB4dR/bcpbNImXPEAO5XhpTtuCzqFj7MjtkutKSY9Bi7bfZELyJjgIevuwOQxEO0yPtJlFG3do+FM3aNAvMB2bf94ZZQxlK8ED+GjvdI/Pww0KuMuTxmSLsP0MZKcuyM1w4oyhveY4V6Fw/NO2Kbc8YHxne1nqns4AwxMD3MwkRlW3YFHsMbFQMxkkjRnNUXwRJPTrgB5NlA5wnqieDJxr7P59tHwOAsV00z823hmjVnRVh3mWk+Mu5bs0RLP1rA+cArF5OkPof8aXiEG5Ulw8wzncBazNeIOojIMsjXhddL5fw2mHFC5krjw9aKoOsb3bb7jxjmplGErJob7UlcruCu2OG3DZCukSkgwJiIjRdrSh5tDOpttB0T7Z67GZlBw0mv7r7dMQyJLX7stEdEI0onQbwa8QXztOFTcBkD4vtAUNxG/6BlpW9yJbSC75wieecwRUU0d/aP07umm+6ZbqantEBf9ddqIqKqubvBVmqT9BaoP6cqJCK21AsFhNRSrSHHEbVNHy0V0mZSh1b7GYFAwO6zT1SU/Pyn5ytwkXpEBWawLTg+B+a5JcvEGz7EWuDOGbzo/x64HrRFY4GX55hGqNF7DDNTcWwFPFzI0empEdoSWu3cWkUV1NJWlPNod7u4/nV+Wso/ousu6IHMQWF3OrRxfWJEdK15BFOmagVqLTCgi40Xq/r/c6NHYRbyKnMUP8tVbaZbq6z9lMvM5Ptqy4X+rdfrJLcETXDqjy2IhaYXaISv9sOaHafROg/hH8aoMTgtkLNoWjp4oq1GJtCfI4/rji9RYgFH75FqNS/gj/8d3HjFiXd17FZASHSsvXJ193zaY1O9WJnyJExM0wQyuJjAPb3RhDCtJ1T631oAFdvulCZ/5sylw+Jmvv/3Z0k+BhPzIMGWxxNHHdwqAUBzrCIMInkM5ewa5wZGq+4dqdAr4xUN1k5EMmSkUzaIOmiVJR87VZ2YpnYFZyp2Ekfvth3t7GjyrZHsJl/5IPk0DMGrGZatZoE7jCI0KuBJERi0HE6WzUPg1WC5/VO4BqtxmoSwWvHpvlDQtodB2FsdQ1HCj4tuC8Qyx7plsUrEi3ncLR3iNgj0LbdjgBMHvcPmdc+VWMHw+d9dk0QGyV18u45FAKBjtZqHuAVdeXEKd1wGbw1VUcGiaNHyCbMcpIly9EJCpbDwwr3vA9eEKRHWM5z1bxlheyEdYy8T2K2QXWcwWVYMdBy7y6izVuJjtObaCoeVZ/WU8WvL+EP5aIGkI93CRZV4Il20OSaDc7Z6Pphfw77mjdi9pdKMagvE37bvdHrpsZ2KwPeAfi4j2C7lxmcBdqLjoXeELsZXOZqfei3bjJPEfce1X0lcq9hGxZqIv0k7jJFT0+nyJt+hOfQtF5Qy2qt9rLkD28W741iXZxfv2TX1vp7/tfZVThppovF1kq4GGWMhOM37PUiB0dKd4ESUjBAdwobBRhYr1AsBB4yDzm6T8hr6Fxpc4/CnOkZh/Lf1ZJpHV7fs5DpGEh1gojjH00nvJOy1QrfNrCew55D3mrzJs+rc4EtyMYwybsnBxWLHO1SZwJSh0WISmzXDhZxL8LyTDRQYVVTonulmVcK3/YIE6DIegMBROpZ7lsw+w+l7Z2yL/NkNml7ossq+vsIH6XsLipKdN4H19rkCW0iJtfhaoUI109aS4bqv3qHsuKBeOLx0H3iYEUVKcE6iL0vVCyWLlMULZsbCJouFfxF/uisJfEjtg/paufRUgA4gCQtoGTFg8O1d+0W6OwW+GYT29jIyVbVl9+4w8y2BsBvtH1Qz1zAS7/emGcMqeZDBOYAGF3R8FlfrJGv+Q9+ZJ6PUCN7WGrwrBrWi6unqks10xye866YxTWkS93km7WjbyvgKDZTKwR5sWA8n5FnVOL412urSKrhUfGfRxU1+2EqL9fXoCOxTaK502jt0OfSCKi3TyE1krPkz6soUtnHMQvdrCfonUDS5Fy+U9pU7no5YUP7bCVHCPV/sZPXaatgsf9mkvpA0pw0655arXWwkR+7aeRHu42zLst+pufD9lx0Zb0egTt5fC5Rm19llLwb9ofWhIvHL71yT3lYW7PzeiEd4FQaBGSmt7JmUUO2UW4Gh1VWUKRSfdrR+SZfmX1zC2Vl90Nv2QQSz48YW3img8KbAEsBorhFvRS6fzyYwhjrNtrUE6JPHyr3zjrOw1I23O3EZ1XBMecvMqYXwu5T5NIFAadU3WVPZcStbXzkr+VbRRXv1p7dDuXHnDy5oENGyllc9RsY/op7XTVlep5Fy0NQj9kza18vpWzQu+HoV9vQXCMgxEzZoMREEDlH6NV9rtm1VrEKxc5P+LOJW4gmfVuiqF9BIZkgJgstUaPR7uNDhQH9RjuGgej7GTHRmij0f+fXGNEq3ibMH+N1x/nsEF/VTUELUx1NVriOEjlWWBZvp8iAP6O4XOIxsGRtmTOhhmeDZmd9Yzy5udPXCmhhkumj788NNGn1YaeatK8viyah38KVTzj/v9Wwan+pShqED9eIjj1mr9l79uk8fU+iOKcenuUzq4s18whDjVx7spt2+Yla9bHSrhRNdBSxVKI2gVrxi60EvyN2i8gNNieHtdfg6dEB/iz+9i8C9Y7A3dzgMfCQy7ZtBvo80weH0rcjOu16N/5G2ja4di1zPR5s/woJZnWMuo+xSh2TM8dl3NkLaP49wZrvv6pHOte+YMhztFtsLl82bo8nB3LWM8ImIjLRtt3gy5QYB3xyTLkrMFsQ81BjBrhgkEHWXgDfq4WFgar7NmCAEoNdABHrRyuWjWDFl837ssfN7cm7d/U54HMWeGCeu/RJLFwWZBgPoL4CkS0n6dM0MWq2ouRx9AadRfwG9qCstmzgxlvYLCEAofZDhuzgxlGzqVIcuaS9dsQoY0XZ/X51ZM4n6usa7QmDX0umsYarOGFiWEtNuunO36JbBMvmZ4EN67ImkgaqHFOWQs2wyVlPc3ZCnkpw6Lg7V7wHJ5W2EtZOnbDOFzmuSNjABAryIZAp41QxiuPgMRKlWViqpZM+TZRHyBT0n4g8yQdC4mYVhgwjEkaeCdb/gWkGS0qJPHp1O8siCMr6aOJ2G4XUu0tMXhLN84f6OkgicLrKVX/2giTeGpj4KYhOHv4TBwBcVClmpLzJzhIu7XPCCvlZScO8PFnXYC/7STlJw9w+bGs1Id4OFLJzc1f4b1MlYhph5CHsXo0pNPGjBMHji9k2p3t2l1Lat0P/AFGjC8krCG/al6Ow0YssfhfawJsA4MkWH4FgzDX8I/yDBLOFwWw8X7+p+f+OqpGN4jUcsF1shy+ZnarMkYDj1U3DD8EQzDX8K/yFBKGoH/M0nTFK93UHzkCRyTafxeOdfTkq438UcMvah57Ot/prji4f6n+erI+/DXwMN7p7hX5sN3T/DVBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgb/Bv4HubauujctnC8AAAAASUVORK5CYII=',
    'A':  'https://image.flaticon.com/icons/png/512/89/89861.png',
    'C':  'https://image.flaticon.com/icons/png/512/89/89833.png',
    'AS':  'https://static.thenounproject.com/png/3148450-200.png',
  }

  descricaoEspecialidade = {
    'M': 'MÉDICO',
    'A': 'ADVOGADO',
    'C': 'CONTADOR',
    'AS': 'ASSESSOR'
  }


  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private prestadorService: PrestadorService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.prestadorService
      .getPrestadores()
      .subscribe(
        (dados) => {
          this.prestadores = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(prestador: Prestador) {
    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o prestador de serviço ${prestador.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(prestador)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(prestador: Prestador) {
    this.prestadorService
      .excluir(prestador.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o prestador ${prestador.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}


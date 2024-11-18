import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Pin = {
  url: string;
};

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor() {}

  getPins(page: number, perPage = 20): Observable<Pin[]> {
    return new Observable<Pin[]>((observer) => {
      setTimeout(() => {
        const mockPins: Pin[] = [
          { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaW4xxOX6qc38S-GLc2S5suBY92GVfmFN1Q&s' },
          { url: 'https://img1.akspic.ru/previews/5/3/0/9/7/179035/179035-voda-gora-gidroresursy-rastenie-oblako-550x310.jpg' },
          { url: 'https://cdn.ingos.ru/images/blog/Bugatti-La-Voiture-Noire.jpg' },
          { url: 'https://media.istockphoto.com/id/1419410282/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B8%D1%85%D0%B8%D0%B9-%D0%BB%D0%B5%D1%81-%D0%B2%D0%B5%D1%81%D0%BD%D0%BE%D0%B9-%D1%81-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%BC%D0%B8-%D1%8F%D1%80%D0%BA%D0%B8%D0%BC%D0%B8-%D1%81%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D1%8B%D0%BC%D0%B8-%D0%BB%D1%83%D1%87%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=JekK-RNumyvN0CDJ1WMyF3-FEFyNH8LUsr5nG8WTwWg=' },
          { url: 'https://avatars.dzeninfra.ru/get-zen_doc/56585/pub_5b124217380d8f4b53e82203_5b12421b714e9100a86ad3bd/scale_1200' },
          { url: 'https://masterpiecer-images.s3.yandex.net/21b71b3c74d111ee978d363fac71b015:upscaled' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Canis_lupus_265b.jpg/640px-Canis_lupus_265b.jpg' },
          { url: 'https://scientificrussia.ru/images/h/320h-large.jpg' },
          { url: 'https://rr-life.ru/upload/medialibrary/30c/2024_03_10_samie_dorogie_avto_v_mire-_5_.jpg' },
          { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaGw1xGRtS2qVP0dz2xgpLD6n8oEo7WoC_VA&s' },
          { url: 'https://img2.akspic.ru/previews/5/0/8/8/7/178805/178805-muzhchina-lazurnyj-solnechnye_ochki-purpur-rukav-500x.jpg' },
          { url: 'https://avatars.mds.yandex.net/i?id=0a8dc1da8b47ac63e1b06dadc55e1a3f_l-5141109-images-thumbs&n=27&h=480&w=480' },
          { url: 'https://s0.rbk.ru/v6_top_pics/media/img/4/50/347082777393504.jpeg' },
          { url: 'https://www.huntworld.ru/upload/iblock/1f9/patron_308win_npz_sp_gilza_latun_pulya_tompak.jpeg' },
          { url: 'https://yacht-serviceazur.com/upload/slam.image/iblock/59c/990_950_1619711fa078991f0a23d032687646b21/59cff3bc5fc2fbc40747358d01a719b1-95.JPG' },
          { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLtn8TGPR6-wQjBTksVuiplmqFrKDqEdWCg&s' },
        ];
        
        observer.next(mockPins);
        observer.complete();
      }, 1000);
    });
  }
}

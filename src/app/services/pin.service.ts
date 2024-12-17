import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Pin = {
  id: number;
  urls: {
    raw: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private getPinsUrl = 'https://api.unsplash.com/photos?client_id=kQ6xg4d5ZklemPe-j7h9FkngtAQOS1_0Lm2ax6O-foE';
  private activePin = new BehaviorSubject<Pin | null>(null);
  private currentId = FILMS_MOCK.length + 1;

  constructor(private http: HttpClient) {}

  getPins(page: number, perPage = 20): Observable<Pin[]> {
    return of(this.assignUniqueIds(FILMS_MOCK));
  }

  private assignUniqueIds(pins: Pin[]): Pin[] {
    return pins.map((pin) => ({
      ...pin,
      id: this.currentId++,
    }));
  }

  setActivePin(pin: Pin | null) {
    this.activePin.next(pin);
  }

  getActivePin() {
    return this.activePin.getValue();
  }
}

export const FILMS_MOCK: Pin[] = [
  {
    id: 1,
    urls: {
      raw: 'https://ar.culture.ru/attachments/attachment/preview/5dd288f60bbfc101a30ddc7b-preview.jpg',
    },
  },
  {
    id: 2,
    urls: {
      raw: 'https://media.istockphoto.com/id/1372040082/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%B8%D1%81%D1%82%D0%BE%D0%BB%D0%B5%D1%82-%D1%81-%D0%BF%D0%B0%D1%82%D1%80%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8-%D0%BD%D0%B0-%D1%87%D0%B5%D1%80%D0%BD%D0%BE%D0%BC-%D0%B1%D0%B5%D1%82%D0%BE%D0%BD%D0%BD%D0%BE%D0%BC-%D1%81%D1%82%D0%BE%D0%BB%D0%B5.jpg?s=612x612&w=0&k=20&c=qVZhsTyHfGS9alN-ScG2tJlEi870HPedUPM390GUeSo=',
    },
  },
  {
    id: 3,
    urls: {
      raw: 'https://masterpiecer-images.s3.yandex.net/11440f5641fc11ee9e9a3a7ca4cc1bdc:upscaled',
    },
  },
  {
    id: 4,
    urls: {
      raw: 'https://img.freepik.com/premium-photo/classic-green-car-driving-down-road-with-trees-background_354831-4305.jpg',
    },
  },
  {
    id: 5,
    urls: {
      raw: 'https://www.rgo.ru/sites/default/files/node/73720/photo-2023-10-25-140017.jpeg',
    },
  },
  {
    id: 6,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9U4L5BgGShAbkl0MbIFTgndwm7MfOFGnRNQ&s',
    },
  },
  {
    id: 7,
    urls: {
      raw: 'https://sneakers.by/image/cache/catalog/sneakers-pics/34649/krossovki-nike-run-swift-2-cu3517-004-13-800x800.jpg',
    },
  },
  {
    id: 8,
    urls: {
      raw: 'https://vlastelin-kolets.ru/Encyclopedia/Pics/edinoe-koltso.jpg',
    },
  },
  {
    id: 10,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShjCXhCOq8Ngi8_JKN0icXEOI11xvo9_-UnA&s',
    },
  },
  {
    id: 11,
    urls: {
      raw: 'https://as1.ftcdn.net/v2/jpg/05/63/82/44/1000_F_563824430_e7oDYwRZvWBYbOMpxG88ojCaCeEI9Sl4.jpg',
    },
  },
  {
    id: 12,
    urls: {
      raw: 'https://img.freepik.com/free-photo/futuristic-time-machine_23-2151599403.jpg',
    },
  },
  {
    id: 13,
    urls: {
      raw: 'https://www.investopedia.com/thmb/u220LqqeStsaBPgVITIKYKTMOic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-200275642-001-576a033e5f9b58346aace876.jpg',
    },
  },
  {
    id: 14,
    urls: {
      raw: 'https://i0.wp.com/sokrsokr.net/wp-content/uploads/2018/03/Istoriya-ne-voshedshaya-v-film-Titanik.jpg?fit=811%2C500&ssl=1',
    },
  },
  {
    id: 15,
    urls: {
      raw: 'https://habrastorage.org/files/9ec/4ea/93a/9ec4ea93ab9a440e8a293a87df6dc303.gif',
    },
  },
  {
    id: 16,
    urls: {
      raw: 'https://fcisloch.by/foto/14032022uni.jpg',
    },
  },
  {
    id: 17,
    urls: {
      raw: 'https://cdn-images.dzcdn.net/images/cover/7d966d384af23d6cd3813827700427d2/0x1900-000000-80-0-0.jpg',
    },
  },
  {
    id: 18,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-tGnka-PmtU3uUhLCb3VwMt11fcZlyucFwQ&s',
    },
  },
  {
    id: 19,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vhbnLGJGN0Y5xH60Gu8ZH8bu-Ao8lkkSx5O_A-UFwHfm5Ho2HBsBilIXY1nK4pmbYUc&usqp=CAU',
    },
  },
  {
    id: 20,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQhKLtr7qZRmspPPQeo9unEj6sw04Y-U8Gjw&s',
    },
  },
  {
    id: 21,
    urls: {
      raw: 'https://eavf3cou74b.exactdn.com/wp-content/uploads/2023/06/28103020/Best-Cameras-for-Professional-Photography-6.jpg',
    },
  },
  {
    id: 22,
    urls: {
      raw: 'https://i.pinimg.com/736x/dd/75/7d/dd757d138e7735cdc8876187f72f4e82.jpg',
    },
  },
  {
    id: 23,
    urls: {
      raw: 'https://www.m4music.com/image/cache/catalog/products/Digital%20Pianos/CLP-765GP-2000x2000.jpg',
    },
  },
  {
    id: 24,
    urls: {
      raw: 'https://budless.shop/wp-content/uploads/2024/03/img_2963-819x1024.jpg',
    },
  },
  {
    id: 25,
    urls: {
      raw: 'https://i.pinimg.com/736x/85/9e/32/859e32b0b2a6e54de42ee778419fedac.jpg',
    },
  },
  {
    id: 26,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9jR_K4w827BQoxAA5YdhNkIdQEdYnykmgg&s',
    },
  },
  {
    id: 27,
    urls: {
      raw: 'https://cdn.britannica.com/27/9727-050-DD5B124D/Palolo-worm.jpg',
    },
  },
  {
    id: 28,
    urls: {
      raw: 'https://naked-science.ru/wp-content/uploads/2016/04/article_dorje_01.jpg',
    },
  },
  {
    id: 29,
    urls: {
      raw: 'https://loscigaros.ru/image/catalog/blogs/churchill/schwarzenegger-green-come-006.jpg',
    },
  },
  {
    id: 30,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhsosWYKHYjdKeC1xRLfprrw9O4WuqPneRw&s',
    },
  },
  {
    id: 31,
    urls: {
      raw: 'https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/d8/images/methode/2020/07/10/ad89450a-c1d5-11ea-8c85-9f30eae6654e_image_hires_194031.JPG?itok=PdRHJEj7&v=1594381242',
    },
  },
  {
    id: 32,
    urls: {
      raw: 'https://storage.googleapis.com/pod_public/1300/157485.jpg',
    },
  },
  {
    id: 33,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeu0YI8RgvYnoH9-LdLdXX5KYiGPhZmcuZ2w&s',
    },
  },
  {
    id: 34,
    urls: {
      raw: 'https://i.pinimg.com/236x/e4/e6/3b/e4e63b8a01eee4acbe7ffef78331f113.jpg',
    },
  },
  {
    id: 35,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rqnxfexKXJF58ebzq4tMe8vSvHCBZ5PTMw&s',
    },
  },
  {
    id: 36,
    urls: {
      raw: 'https://img.muzline.ua/image/catalog/articles/duhovie-instrumenti/truby/interesnie-facty-truba-duhovoy-instrument-1.jpg',
    },
  },
  {
    id: 37,
    urls: {
      raw: 'https://masterpiecer-images.s3.yandex.net/55f99650ac6f11ee994db20e76ad207e:upscaled',
    },
  },
  {
    id: 38,
    urls: {
      raw: 'https://minsknews.by/wp-content/uploads/2024/09/1000m.jpg',
    },
  },
  {
    id: 39,
    urls: {
      raw: 'https://backend.nnmotors.ru/uploads/images/blogs/5-6.jpg',
    },
  },
  {
    id: 40,
    urls: {
      raw: 'https://lamitopsail.org/wp-content/uploads/2022/07/Swift-under-sail-1998-resized-and-cropped-1-e1697810413214.jpg',
    },
  },
  {
    id: 41,
    urls: {
      raw: 'https://earthshotprize.org/wp-content/uploads/2024/08/TEP-Oceans-L.jpg',
    },
  },
  {
    id: 42,
    urls: {
      raw: 'https://imageio.forbes.com/blogs-images/ofx/files/2018/09/OFX3-iStock-492595743-1200x800.jpg?format=jpg&height=900&width=1600&fit=bounds',
    },
  },
  {
    id: 43,
    urls: {
      raw: 'https://cdn.mos.cms.futurecdn.net/yHZP4ETEXCWw7BFz25xfUV-1200-80.jpg',
    },
  },
  {
    id: 44,
    urls: {
      raw: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/The_Battle_of_Culloden.jpg/1280px-The_Battle_of_Culloden.jpg',
    },
  },
  {
    id: 45,
    urls: {
      raw: 'https://steamlineluggage.com/cdn/shop/files/The_Pioneer_Stowaway_z.jpg?v=1730758421&width=1800',
    },
  },
  {
    id: 46,
    urls: {
      raw: 'https://marcdarcy.co.uk/cdn/shop/products/Bromleysuit.png?v=1653408101&width=1080',
    },
  },
  {
    id: 47,
    urls: {
      raw: 'https://sloanes.co.th/wp-content/uploads/2022/10/800px-Christmas_Tree_56651310-792x648-c-center.jpeg',
    },
  },
  {
    id: 48,
    urls: {
      raw: 'https://anapacity.com/images/uploads/kavkazskij-volk.jpg',
    },
  },
  {
    id: 49,
    urls: {
      raw: 'https://i.guim.co.uk/img/media/aaada24238c5e9d01e7980053199c588067a24d3/0_157_5471_3282/master/5471.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2c3d6f2a3fbb64a707bd19542c35a1b6',
    },
  },
  {
    id: 50,
    urls: {
      raw: 'https://cdnn1.img.sputnik.tj/img/102772/56/1027725675_185:0:1629:908_1920x0_80_0_0_d1bbf2d042774ddd746dc9568af6d141.jpg',
    },
  },
  {
    id: 51,
    urls: {
      raw: 'https://news.mit.edu/sites/default/files/images/202409/MIT-PrisonHeat-01.jpg',
    },
  },
  {
    id: 52,
    urls: {
      raw: 'https://www.digi.com/getattachment/Blog/post/Smart-Cities-in-the-US-Examples/GettyImages-1153849876-NewYork-1280x720.jpg?lang=en-US',
    },
  },
  {
    id: 53,
    urls: {
      raw: 'https://assets.unenvironment.org/decadeonrestoration/2020-03/nature-3294681_1280%20%281%29.jpg',
    },
  },
  {
    id: 54,
    urls: {
      raw: 'https://images.prom.ua/4124010868_w600_h600_4124010868.jpg',
    },
  },
  {
    id: 55,
    urls: {
      raw: 'https://i.ytimg.com/vi/W6WJwCOoUbY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCePBQJemia_5Umr62jI2nSMHZusQ',
    },
  },
  {
    id: 56,
    urls: {
      raw: 'https://www.hnf.de/uploads/tx_templavoila/IBM-PC_HNF_1.jpg',
    },
  },
  {
    id: 57,
    urls: {
      raw: 'https://us.lakpura.com/cdn/shop/articles/Cocount.jpg?v=1718091709&width=1100',
    },
  },
  {
    id: 58,
    urls: {
      raw: 'https://formandfunctionllc.com/wp-content/uploads/2018/01/snow-scene2.jpg',
    },
  },
  {
    id: 59,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnCLo5U4m4u-P8ls3CqSfrQ4xO5k_CS-OFHg&s',
    },
  },
  {
    id: 60,
    urls: {
      raw: 'https://files.worldwildlife.org/wwfcmsprod/images/Brown_Bear_/story_full_width/3box0qwlkk_brownbear_hero.jpg',
    },
  },
  {
    id: 61,
    urls: {
      raw: 'https://newscentral.africa/wp-content/uploads/US-Asserts-Robust-Military-Presence-as-Middle-East-Crisis-Escalates.jpg',
    },
  },
  {
    id: 62,
    urls: {
      raw: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chess_pieces_close_up.jpg/640px-Chess_pieces_close_up.jpg',
    },
  },
  {
    id: 63,
    urls: {
      raw: 'https://energytracker.asia/wp-content/uploads/2022/12/forest-plantation-1024x683.jpg',
    },
  },
  {
    id: 64,
    urls: {
      raw: 'https://images.stockcake.com/public/a/a/8/aa8e3edb-c381-4b14-af09-4f852af8091d_large/policeman-on-duty-stockcake.jpg',
    },
  },
  {
    id: 65,
    urls: {
      raw: 'https://media.npr.org/assets/img/2024/04/26/gettyimages-1201425161_custom-c8dc7f7de7d65ba6ee902bc6c3cb0e6fd298cc10.jpg?s=1100&c=85&f=jpeg',
    },
  },
  {
    id: 66,
    urls: {
      raw: 'https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/4/3/0/8/1578034-1-eng-GB/40f1661cd80b-75385754_4K.jpg',
    },
  },
  {
    id: 67,
    urls: {
      raw: 'https://imageio.forbes.com/specials-images/imageserve/66ba827c8ff2be58a5e1ea62/Aircraft-landing-at-sunrise/960x0.jpg?format=jpg&width=960',
    },
  },
  {
    id: 68,
    urls: {
      raw: 'https://images.wsj.net/im-70140133?width=700&height=466',
    },
  },
  {
    id: 69,
    urls: {
      raw: 'https://www.gcrailway.co.uk/wp-content/uploads/2024/01/566x400x48305-loughborough-Kinchley-Lane-2-Alan-Weaver-26-01-24-scaled.jpg.pagespeed.ic.GIHwGfQBqG.jpg',
    },
  },
  {
    id: 70,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1TIiOQqyXjI5M4Eat9EGOvniydfs_1d5ZEA&s',
    },
  },
  {
    id: 71,
    urls: {
      raw: 'https://variety.com/wp-content/uploads/2013/04/ironman3_tonystark.jpg?w=1000&h=667&crop=1',
    },
  },
  {
    id: 72,
    urls: {
      raw: 'https://www.photomural.com/media/catalog/product/I/A/IADX10-065.jpg',
    },
  },
  {
    id: 73,
    urls: {
      raw: 'https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg',
    },
  },
  {
    id: 74,
    urls: {
      raw: 'https://cs11.pikabu.ru/post_img/big/2018/05/22/6/1526980199149221388.png',
    },
  },
  {
    id: 75,
    urls: {
      raw: 'https://t4.ftcdn.net/jpg/08/66/08/99/360_F_866089931_iiFPNAwjSbOTM0r2mxUVivCJxVBCTDAj.jpg',
    },
  },
];

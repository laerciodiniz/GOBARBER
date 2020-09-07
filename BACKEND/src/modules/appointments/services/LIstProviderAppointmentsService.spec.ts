import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppoinmentsRepository: FakeAppoinmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppoinmentsRepository = new FakeAppoinmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppoinmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppoinmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 8, 3, 14, 0, 0),
    });

    const appointment2 = await fakeAppoinmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 8, 3, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 9,
      day: 3,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});

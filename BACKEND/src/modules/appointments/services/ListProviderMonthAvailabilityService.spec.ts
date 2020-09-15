import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppoinmentsRepository: FakeAppoinmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppoinmentsRepository = new FakeAppoinmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppoinmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 8, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 9, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 10, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 11, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 12, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 13, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 14, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 15, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 16, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 30, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 9,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 13, available: false },
        { day: 15, available: true },
        { day: 16, available: true },
      ]),
    );
  });
});

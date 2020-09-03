import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppoinmentsRepository: FakeAppoinmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppoinmentsRepository = new FakeAppoinmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppoinmentsRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 3, 14, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 8, 3, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 3, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 9,
      day: 3,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});

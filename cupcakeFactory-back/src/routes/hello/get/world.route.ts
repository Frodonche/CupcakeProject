import { OnGet, ReplyNoContinue, Route, Request } from '@hapiness/core';

@Route({
    path: '/api/hello',
    method: 'GET'
})
export class GetHelloWorldRoute implements OnGet {
    /**
     * OnGet implementation
     *
     * @param {Request} request
     * @param {ReplyNoContinue} reply
     */
    onGet(request: Request, reply: ReplyNoContinue): void {
        reply('world');
    }
}

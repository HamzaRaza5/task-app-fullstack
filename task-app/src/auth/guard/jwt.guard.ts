import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/utils/constants';

export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    // agar request.url BY_PASS_URLS me se kisi bhi url se match ho rha ho to usey true kardo aagey janey do
    for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
      if (request.url == Constants.BY_PASS_URLS[x]) return true;
    }

    // otherwise else k case me AuthGuard khud handle karey ga
    return super.canActivate(context);
  }
}
